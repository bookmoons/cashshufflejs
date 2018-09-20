Protocol
========

CashShuffle_ is an extension to CoinShuffle_. The CoinShuffle protocol defines
a sequence of 5 phases (+ a 6th blame phase for identifying protocol
violators). Several details are left implementation defined.

`cashshufflejs` uses this configuration for conformance with the reference
implementation:

- Message types are defined with protobuf_.
- Messages on the wire are delimited using a separator scheme. Each wire
  message is terminated withe the Unicode character `U+23CE Return Symbol`_
  in UTF-8. That encodes to the 3 byte sequence ``e2 8f 8e``.
- For encryption strings are encoded to UTF-8 without BOM.
- For signing packets are encoded to undelimited wire format.

.. _CashShuffle: https://cashshuffle.com/
.. _CoinShuffle: http://crypsys.mmci.uni-saarland.de/projects/CoinShuffle/
.. _protobuf: https://developers.google.com/protocol-buffers/
.. _`U+23CE Return Symbol`: https://codepoints.net/U+23CE

.. autofunction:: protocol.Phase

.. autofunction:: protocol.Reason

.. autofunction:: protocol.Invalid

.. autofunction:: protocol.Address

.. autofunction:: protocol.DecryptionKey

.. autofunction:: protocol.EncryptionKey

.. autofunction:: protocol.Hash

.. autofunction:: protocol.InputSignature

.. autofunction:: protocol.Registration

.. autofunction:: protocol.Signature

.. autofunction:: protocol.Transaction

.. autofunction:: protocol.VerificationKey

.. autofunction:: protocol.Message

.. autofunction:: protocol.Packet

.. autofunction:: protocol.Signed

.. autofunction:: protocol.Packets

.. autofunction:: protocol.Blame
